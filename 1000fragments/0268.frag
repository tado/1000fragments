uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.78 + jf * 4.0), cos(t * 0.24 * jf)) * 0.72;
        xs += sin(length(p - im) * 113.07 - t * 10.38 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.55;
	p = fract(p * 1.03) - 0.5;
	p = abs(p);
	p = rot2(time * -0.57) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.20), field(p, time, 2.39));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
