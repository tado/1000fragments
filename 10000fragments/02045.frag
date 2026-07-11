uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 7.47 + sr * 18.41 - t * 1.96 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.72, lr * 2.49 + time * -0.27); }
	{ p = vec2(atan(p.y, p.x) * 1.40, length(p) * 2.77 - time * 0.27); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.97 + time * 0.23, vec3(0.55, 0.48, 0.43), vec3(0.31, 0.34, 0.50), vec3(1.20, 1.17, 0.95), vec3(0.11, 0.95, 0.37));
	col = fract(col * 1.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
