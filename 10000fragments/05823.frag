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
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.29 + jf * 4.0), cos(t * 0.32 * jf)) * 0.89;
        xs += sin(length(p - im) * 66.25 - t * 4.46 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.56) * p;
	p = fract(p * 2.47) - 0.5;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.44 * p.y + time * 0.96); p.y += 0.39 / wf * cos(wf * 2.71 * p.x + time * 1.04); }
	p *= 1.72;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.45 + time * 0.05, vec3(0.54, 0.57, 0.42), vec3(0.49, 0.38, 0.44), vec3(0.87, 0.85, 1.01), vec3(0.18, 0.04, 0.55));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
