uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.30 + t * 1.05 + ph) + sin(p.y * 2.70 - t * 1.05 + ph)
        + sin((p.x + p.y) * 6.73 + t * 1.05 + ph) + sin(length(p) * 11.18 - t * 1.05 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.15 + jf * 4.0), cos(t * 0.40 * jf)) * 0.33;
        xs += sin(length(p - im) * 135.35 - t * 5.12 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.48);
	float d = d1 + d2;
	vec3 col = palette(d * 1.40 + time * 0.28, vec3(0.49, 0.50, 0.53), vec3(0.46, 0.40, 0.33), vec3(0.74, 0.83, 0.97), vec3(0.38, 0.81, 0.30));
	col = clamp((col - 0.5) * 1.93 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
