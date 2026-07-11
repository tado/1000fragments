uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.65 + sr * 18.36 - t * 3.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.94;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.95), field(p, time, 1.90));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.27));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
