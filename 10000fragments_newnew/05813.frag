uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.05 + sin(p.y * 4.53 + t * 2.66) * 3.76 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.60 + jf * 4.0), cos(t * 0.32 * jf)) * 0.77;
        xs += sin(length(p - im) * 102.64 - t * 4.81 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.83;
	p = rot2(time * -0.44) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.47);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.06 + time * 0.17, vec3(0.50, 0.56, 0.49), vec3(0.40, 0.42, 0.42), vec3(1.00, 1.20, 0.74), vec3(0.26, 0.69, 0.15));
	col = fract(col * 1.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
