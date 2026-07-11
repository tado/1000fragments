uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.44 + t * 1.06 + ph) + sin(p.y * 13.16 - t * 3.28 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.48, 0.0)) * 19.85 - t * 2.51 + ph);
    float mb = sin(length(p + vec2(0.48, 0.0)) * 29.64 - t * 1.18 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.63;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.59;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.55; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.31);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.7));
	vec3 col = palette(d * 0.99 + time * 0.18, vec3(0.60, 0.51, 0.43), vec3(0.33, 0.39, 0.36), vec3(0.73, 1.03, 1.27), vec3(0.20, 0.70, 0.09));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
