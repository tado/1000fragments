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
        vec2 im = vec2(sin(t * 0.41 + jf * 4.0), cos(t * 0.38 * jf)) * 0.39;
        xs += sin(length(p - im) * 135.18 - t * 10.69 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.45, 0.0)) * 9.05 - t * 5.48 + ph);
    float mb = sin(length(p + vec2(0.45, 0.0)) * 20.17 - t * 5.48 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.16);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.44 + time * 0.26, vec3(0.57, 0.48, 0.55), vec3(0.45, 0.46, 0.42), vec3(1.39, 1.04, 0.84), vec3(0.68, 0.48, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
