uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 8.13 + t * 0.96 + ph) * 0.7;
    float wb = sin(p.y * 5.65 - t * 0.65 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.57;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.21 + t * 0.86) - 0.5) * 2.0;
    v = sin((p.y * 5.27 + zx * 1.74 + t * 2.73) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.24;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.45; }
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 0.64));
	p.y += sin(p.x * 6.12 + time * 2.02) * 0.32;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.44);
	float d = d1 + d2;
	vec3 col = palette(d * 1.18 + time * 0.16, vec3(0.43, 0.46, 0.41), vec3(0.48, 0.39, 0.50), vec3(0.84, 1.32, 0.84), vec3(0.40, 0.38, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
