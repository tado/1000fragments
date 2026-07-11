uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.12 + jf * 4.0), cos(t * 0.44 * jf)) * 0.38;
        xs += sin(length(p - im) * 129.48 - t * 9.72 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.05 + t * 2.51 + ph) + sin(p.y * 7.36 - t * 4.78 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 1.72) - 0.5;
	p += vec2(-0.46, -0.69) * sin(length(p) * 4.22 - time * 1.75) * 0.35;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.32);
	float d = d1 + d2;
	vec3 col = palette(d * 1.50 + time * 0.14, vec3(0.50, 0.60, 0.40), vec3(0.36, 0.42, 0.35), vec3(0.86, 1.12, 1.08), vec3(0.94, 0.93, 0.88));
	col = fract(col * 1.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
