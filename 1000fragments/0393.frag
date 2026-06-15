uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 13.20 - t * 7.74 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.23 + jf * 4.0), cos(t * 0.30 * jf)) * 0.45;
        xs += sin(length(p - im) * 166.48 - t * 8.38 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.73;
	p = rot2(length(p) * 2.87 + time * 1.17) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.50);
	float d = d1 + d2;
	vec3 col = palette(d * 0.89 + time * 0.04, vec3(0.52, 0.45, 0.43), vec3(0.49, 0.38, 0.37), vec3(0.94, 1.33, 1.34), vec3(0.58, 0.92, 0.92));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
