uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.79 + jf * 4.0), cos(t * 0.46 * jf)) * 0.54;
        xs += sin(length(p - im) * 206.39 - t * 8.69 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.08 / 3.1415927, 0.58 / r - time * 0.55);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.68, 0.65, 0.48) * (0.18 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col *= clamp(r * 1.86, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
