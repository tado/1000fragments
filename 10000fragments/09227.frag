uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.80 + jf * 4.0), cos(t * 0.45 * jf)) * 0.63;
        xs += sin(length(p - im) * 102.31 - t * 7.29 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.65;
	p *= 3.09;
	p = rot2(2.08) * p;
	p = fract(p * 2.95) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.57), field(p, time, 1.13));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
