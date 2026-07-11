uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 11.43 + sr * 18.47 - t * 1.57 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.55;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.75), field(p, time, 1.49));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.43));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
