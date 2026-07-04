uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.24 + jf * 4.0), cos(t * 0.58 * jf)) * 0.55;
        xs += sin(length(p - im) * 122.72 - t * 12.59 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.45), cos(time * 0.73)) * 0.23;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.41 / 3.1415927, 1.45 / r + time * 2.32);
	float d = field(tv, time, 0.0);
	vec3 col = vec3(0.71, 0.51, 0.50) * (0.12 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col *= clamp(r * 1.15, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
