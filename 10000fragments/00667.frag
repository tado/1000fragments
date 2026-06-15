uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.59, 0.0)) * 14.00 - t * 4.81 + ph);
    float mb = sin(length(p + vec2(0.59, 0.0)) * 34.20 - t * 4.81 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + -0.50 * fr * fr; }
	p += vec2(-0.39, 0.92) * sin(length(p) * 5.12 - time * 1.84) * 0.14;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.79 + time * 0.03, vec3(0.46, 0.44, 0.41), vec3(0.45, 0.33, 0.41), vec3(1.01, 0.75, 1.19), vec3(0.49, 0.51, 0.14));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
