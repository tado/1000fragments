uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.38 + jf * 4.0), cos(t * 0.10 * jf)) * 0.73;
        xs += sin(length(p - im) * 191.11 - t * 7.14 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.21 / 3.1415927, 1.15 / r - time * 0.80);
	tv.x += tv.y * 0.18;
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.31, 0.42, 0.92) * (0.15 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 2.71, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
