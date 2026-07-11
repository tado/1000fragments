uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.28 + jf * 4.0), cos(t * 0.18 * jf)) * 0.40;
        xs += sin(length(p - im) * 141.78 - t * 10.71 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.38 + jf * 4.0), cos(t * 0.56 * jf)) * 0.78;
        xs += sin(length(p - im) * 78.20 - t * 4.46 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.37, -0.28) * sin(length(p) * 5.18 - time * 0.72) * 0.15;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.30);
	float d = d1 * d2;
	vec3 col = palette(d * 1.69 + time * 0.19, vec3(0.45, 0.45, 0.58), vec3(0.32, 0.32, 0.33), vec3(0.95, 0.73, 1.38), vec3(0.31, 0.10, 0.82));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.82));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
