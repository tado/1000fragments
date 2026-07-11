uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.69 + jf * 4.0), cos(t * 0.59 * jf)) * 0.49;
        xs += sin(length(p - im) * 153.06 - t * 12.55 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.20;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.81 / 3.1415927, 1.11 / r - time * 2.54);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.75, 0.23, 0.45) * (0.14 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	col *= clamp(r * 2.69, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
