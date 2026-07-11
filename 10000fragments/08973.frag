uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.79 + jf * 4.0), cos(t * 0.44 * jf)) * 0.68;
        xs += sin(length(p - im) * 167.16 - t * 12.56 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 3.58 * p.y + time * 1.37); p.y += 0.40 / wf * cos(wf * 2.39 * p.x + time * 0.90); }
	p = abs(p) - 0.33;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.40; p = rot2(1.38) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.41, 0.39, 0.17), vec3(0.80, 0.65, 0.50), d);
	col = mod(col * 2.18, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
