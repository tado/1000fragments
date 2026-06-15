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
        vec2 im = vec2(sin(t * 0.97 + jf * 4.0), cos(t * 0.29 * jf)) * 0.72;
        xs += sin(length(p - im) * 219.49 - t * 7.57 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.53;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 1.88 * p.y + time * 1.92); p.y += 0.31 / wf * cos(wf * 2.77 * p.x + time * 1.13); }
	p = rot2(time * 1.23) * p;
	p *= 3.33;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.97 + time * 0.00, vec3(0.41, 0.59, 0.42), vec3(0.38, 0.45, 0.32), vec3(1.40, 1.31, 1.32), vec3(0.49, 0.74, 0.54));
	col = clamp((col - 0.5) * 1.72 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
