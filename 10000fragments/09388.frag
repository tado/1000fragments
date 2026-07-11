uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.95 + jf * 4.0), cos(t * 0.39 * jf)) * 0.44;
        xs += sin(length(p - im) * 169.75 - t * 6.81 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.38;
	{ float fr = length(p); p *= 1.0 + 0.33 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p = fract(p * 2.03) - 0.5;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.31; p = rot2(0.36) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.77), field(p, time, 1.55));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
