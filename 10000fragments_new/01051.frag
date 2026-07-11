uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.92 + jf * 4.0), cos(t * 0.41 * jf)) * 0.99;
        xs += sin(length(p - im) * 101.01 - t * 4.99 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.24), cos(time * 0.77)) * 0.08;
	float an = atan(p.y, p.x) + time * 0.22;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.24 / 3.1415927, 0.93 / r + time * 0.94);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.32 + time * 0.13);
	col *= clamp(r * 2.35, 0.0, 1.0);
	col = mod(col * 2.58, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
