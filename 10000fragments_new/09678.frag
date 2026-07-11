uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.55 + jf * 4.0), cos(t * 0.40 * jf)) * 0.77;
        xs += sin(length(p - im) * 90.72 - t * 5.24 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * -0.16;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.62 / 3.1415927, 0.77 / r - time * 2.81);
	tv.x += tv.y * 0.38;
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 1.00 + time * 0.31);
	col *= clamp(r * 2.48, 0.0, 1.0);
	col = clamp((col - 0.5) * 2.06 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
