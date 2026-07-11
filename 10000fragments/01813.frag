uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.47 + sr * 13.10 - t * 3.13 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 14.47 + t * 3.28 + ph) + sin(p.y * 11.05 - t * 0.60 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.06;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 1.27) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.36);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.53 + time * 0.28, vec3(0.47, 0.53, 0.41), vec3(0.39, 0.36, 0.44), vec3(0.98, 1.08, 1.08), vec3(0.87, 0.34, 0.96));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
