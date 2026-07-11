uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.78 + t * 1.97 + ph) + sin(p.y * 5.68 - t * 1.97 + ph)
        + sin((p.x + p.y) * 11.89 + t * 1.97 + ph) + sin(length(p) * 7.19 - t * 1.97 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.77 + jf * 4.0), cos(t * 0.35 * jf)) * 0.83;
        xs += sin(length(p - im) * 103.76 - t * 4.67 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = fract(p * 1.81) - 0.5;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.44);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.39 + time * 0.17, vec3(0.54, 0.58, 0.53), vec3(0.43, 0.34, 0.40), vec3(0.83, 1.16, 0.85), vec3(0.30, 0.87, 0.40));
	col = fract(col * 1.56);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
