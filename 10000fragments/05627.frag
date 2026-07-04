uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.28 + jf * 4.0), cos(t * 0.54 * jf)) * 0.55;
        xs += sin(length(p - im) * 74.97 - t * 9.36 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.61;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 0.89));
	p = rot2(time * 0.33) * p;
	p = abs(p) - 0.33;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.33; p = rot2(2.00) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.50, 0.48, 0.30) * (0.08 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.66 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
