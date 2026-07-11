uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.58 + jf * 4.0), cos(t * 0.35 * jf)) * 0.90;
        xs += sin(length(p - im) * 179.19 - t * 7.43 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.91;
	p = fract(p * 2.98) - 0.5;
	p += vec2(-0.72, 0.86) * sin(length(p) * 2.60 - time * 1.59) * 0.23;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.11; p = rot2(2.01) * p; }
	p = rot2(time * 1.24) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.93), field(p, time, 1.87));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
