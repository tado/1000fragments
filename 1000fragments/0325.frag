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
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.50 + jf * 4.0), cos(t * 0.49 * jf)) * 0.82;
        xs += sin(length(p - im) * 105.02 - t * 10.11 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.10 + sr * 18.73 - t * 4.03 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.31;
	p += vec2(0.65, -0.35) * sin(length(p) * 3.90 - time * 1.57) * 0.15;
	p = rot2(time * -1.20) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.53);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.54 + time * 0.02, vec3(0.41, 0.47, 0.43), vec3(0.40, 0.46, 0.38), vec3(1.08, 1.23, 1.28), vec3(0.59, 0.68, 0.90));
	col = mod(col * 1.39, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
