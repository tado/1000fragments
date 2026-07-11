uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.42, 0.0)) * 19.82 - t * 1.38 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 30.83 - t * 1.38 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.28;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.55, lr * 1.74 + time * -0.65); }
	{ p = vec2(atan(p.y, p.x) * 2.19, length(p) * 3.71 - time * 0.14); }
	p = fract(p * 2.75) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.09 + time * 0.29, vec3(0.53, 0.48, 0.40), vec3(0.38, 0.41, 0.49), vec3(0.93, 1.25, 1.23), vec3(0.92, 0.94, 0.96));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
