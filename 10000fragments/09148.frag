uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.12 + jf * 4.0), cos(t * 0.45 * jf)) * 0.84;
        xs += sin(length(p - im) * 195.25 - t * 13.94 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.74;
	{ float fr = length(p); p *= 1.0 + 0.24 * fr * fr; }
	p += vec2(-0.30, 0.41) * sin(length(p) * 4.94 - time * 1.03) * 0.19;
	p = rot2(p.y * -2.58 + time * 0.12) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.23), field(p, time, 2.46));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.30));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
