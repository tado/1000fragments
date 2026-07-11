uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.00 + t * 4.54 + ph) + sin(p.y * 4.01 - t * 4.54 + ph)
        + sin((p.x + p.y) * 6.35 + t * 4.54 + ph) + sin(length(p) * 5.25 - t * 4.54 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.11 + t * 2.88 + ph) + sin(p.y * 8.98 - t * 2.88 + ph)
        + sin((p.x + p.y) * 6.36 + t * 2.88 + ph) + sin(length(p) * 16.68 - t * 2.88 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.92);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.14 + time * 0.28, vec3(0.55, 0.44, 0.53), vec3(0.32, 0.38, 0.39), vec3(1.19, 0.72, 1.37), vec3(0.56, 0.45, 0.79));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.56));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
