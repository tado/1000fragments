uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.31 + jf * 4.0), cos(t * 0.29 * jf)) * 0.44;
        xs += sin(length(p - im) * 125.46 - t * 6.70 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 2.75 + time * 0.50) * p;
	p = rot2(time * -0.20) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.02), field(p, time, 2.03));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
