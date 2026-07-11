uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.29 + jf * 4.0), cos(t * 0.51 * jf)) * 0.40;
        xs += sin(length(p - im) * 211.39 - t * 5.16 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.32), cos(time * 1.31)) * 0.29;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.15 / 3.1415927, 0.85 / r - time * 2.99);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.19, 0.80, 0.80) * (0.17 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col *= clamp(r * 1.79, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
