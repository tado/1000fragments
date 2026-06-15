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
        vec2 im = vec2(sin(t * 0.60 + jf * 4.0), cos(t * 0.11 * jf)) * 0.84;
        xs += sin(length(p - im) * 80.65 - t * 7.54 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.30;
	p = rot2(length(p) * 3.11 + time * 0.98) * p;
	p = rot2(p.y * 2.99 + time * 0.93) * p;
	{ p = vec2(atan(p.y, p.x) * 1.40, length(p) * 4.09 - time * 0.78); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.10 + time * 0.24, vec3(0.47, 0.52, 0.53), vec3(0.39, 0.39, 0.40), vec3(0.86, 0.72, 1.30), vec3(0.13, 0.35, 0.91));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
