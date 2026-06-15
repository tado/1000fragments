uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 29.19 - t * 4.11 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.28 + jf * 4.0), cos(t * 0.20 * jf)) * 0.47;
        xs += sin(length(p - im) * 121.06 - t * 5.30 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ p = vec2(atan(p.y, p.x) * 2.80, length(p) * 2.37 - time * 0.27); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.71);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.13 + time * 0.26, vec3(0.49, 0.55, 0.56), vec3(0.41, 0.46, 0.41), vec3(0.76, 1.27, 1.35), vec3(0.47, 0.18, 0.48));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
