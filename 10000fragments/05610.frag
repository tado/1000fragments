uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.62 + jf * 4.0), cos(t * 0.51 * jf)) * 0.91;
        xs += sin(length(p - im) * 198.98 - t * 4.20 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.58, t * 1.20 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.74;
	p += vec2(-0.04, 0.62) * sin(length(p) * 5.69 - time * 1.34) * 0.29;
	p = abs(p) - 0.47;
	p = rot2(p.y * -2.20 + time * 0.44) * p;
	p = rot2(length(p) * 1.14 + time * 1.16) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.58);
	float d = d1 + d2;
	vec3 col = palette(d * 1.45 + time * 0.26, vec3(0.42, 0.54, 0.45), vec3(0.43, 0.49, 0.50), vec3(1.04, 0.75, 0.75), vec3(0.17, 0.70, 0.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
