uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.09 + sr * 14.91 - t * 1.82 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.46;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.99), field(p, time, 1.98));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.23, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
