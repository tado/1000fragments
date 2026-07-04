uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.13 + jf * 4.0), cos(t * 0.52 * jf)) * 0.90;
        xs += sin(length(p - im) * 192.11 - t * 9.40 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x) + time * 0.29;
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.18 / 3.1415927, 0.39 / r + time * 2.39);
	float d = field(tv, time, 0.0);
	vec3 col = hue(d * 0.50 + time * 0.03);
	col *= clamp(r * 2.45, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
