uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.08 + sr * 22.21 - t * 3.26 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.59, 0.93) * sin(length(p) * 4.51 - time * 2.36) * 0.29;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.26, lr * 2.34 + time * 0.62); }
	p = abs(p) - 0.29;
	p = (floor(p * 29.6) + 0.5) / 29.6;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.09 + time * 0.11, vec3(0.42, 0.58, 0.43), vec3(0.46, 0.33, 0.47), vec3(0.74, 0.96, 1.17), vec3(0.29, 0.64, 0.89));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
