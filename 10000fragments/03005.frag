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
        vec2 im = vec2(sin(t * 0.85 + jf * 4.0), cos(t * 0.47 * jf)) * 0.54;
        xs += sin(length(p - im) * 114.13 - t * 4.61 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 37.96 - t * 3.42 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 34.14 - t * 3.42 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.37);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.65 + time * 0.10, vec3(0.60, 0.56, 0.43), vec3(0.46, 0.37, 0.37), vec3(1.17, 1.25, 1.08), vec3(0.53, 0.39, 0.40));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
