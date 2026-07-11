uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.01 + t * 1.23) - 0.5) * 2.0;
    v = sin((p.y * 5.69 + zx * 1.78 + t * 2.15) * 3.1415927 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.29;
    v = 0.5 * (sin(2.0 * cp.x + t * 2.65) * sin(2.0 * cp.y + ph)
             + sin(2.0 * cp.x - t * 0.84) * sin(2.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 1.0 + 0.13 * sin(time * 4.66);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.60);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.65 + time * 0.18, vec3(0.46, 0.58, 0.42), vec3(0.42, 0.50, 0.42), vec3(0.78, 0.81, 1.36), vec3(0.48, 0.24, 0.71));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.73 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
