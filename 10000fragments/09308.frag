uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.48 + jf * 4.0), cos(t * 0.35 * jf)) * 0.37;
        xs += sin(length(p - im) * 215.88 - t * 7.89 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.03;
	p = rot2(time * 1.12) * p;
	{ float fr = length(p); p *= 1.0 + -0.65 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.40), field(p, time, 0.81));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
