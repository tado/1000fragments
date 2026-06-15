uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.41 + jf * 4.0), cos(t * 0.51 * jf)) * 0.67;
        xs += sin(length(p - im) * 131.98 - t * 9.12 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.41;
	p = rot2(length(p) * 1.37 + time * 0.93) * p;
	p = rot2(time * -1.31) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.25), field(p, time, 0.51));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.27, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
