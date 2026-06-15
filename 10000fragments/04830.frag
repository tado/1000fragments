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
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.99 + jf * 4.0), cos(t * 0.40 * jf)) * 0.99;
        xs += sin(length(p - im) * 121.99 - t * 9.89 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.42;
	p = fract(p * 2.49) - 0.5;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.48; p = rot2(2.01) * p; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 1.96 * p.y + time * 1.75); p.y += 0.27 / wf * cos(wf * 1.50 * p.x + time * 1.64); }
	p = abs(p) - 0.62;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.07, vec3(0.56, 0.48, 0.49), vec3(0.33, 0.42, 0.36), vec3(0.76, 1.35, 0.90), vec3(0.99, 0.21, 0.04));
	col = fract(col * 2.44);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
