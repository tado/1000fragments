uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.73 + t * 3.16 + ph) + sin(p.y * 11.40 - t * 3.87 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.30, 0.0)) * 33.35 - t * 2.03 + ph);
    float mb = sin(length(p + vec2(0.30, 0.0)) * 34.24 - t * 2.03 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.10);
	float d = d1 + d2;
	vec3 col = palette(d * 0.54 + time * 0.00, vec3(0.48, 0.52, 0.47), vec3(0.39, 0.40, 0.32), vec3(1.12, 1.14, 1.00), vec3(0.30, 0.68, 0.70));
	col = fract(col * 1.80);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
