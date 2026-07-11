uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.42 + jf * 4.0), cos(t * 0.55 * jf)) * 0.53;
        xs += sin(length(p - im) * 195.47 - t * 7.28 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.32;
	{ float fr = length(p); p *= 1.0 + -0.63 * fr * fr; }
	p.y += sin(p.x * 2.50 + time * 1.27) * 0.11;
	p = rot2(time * -0.60) * p;
	p = (floor(p * 18.9) + 0.5) / 18.9;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.36), field(p, time, 2.73));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
