uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.91 + jf * 4.0), cos(t * 0.42 * jf)) * 0.56;
        xs += sin(length(p - im) * 65.00 - t * 8.58 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 0.99), cos(time * 0.70)) * 0.16;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.04 / 3.1415927, 0.33 / r + time * 2.91);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.81 + time * 0.38, vec3(0.56, 0.54, 0.58), vec3(0.47, 0.49, 0.35), vec3(0.80, 0.91, 1.26), vec3(0.09, 0.63, 0.21));
	col *= clamp(r * 2.46, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
