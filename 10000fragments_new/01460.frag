uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.47 + jf * 4.0), cos(t * 0.56 * jf)) * 0.76;
        xs += sin(length(p - im) * 188.16 - t * 6.83 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin(time * 1.16), cos(time * 1.23)) * 0.14;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.95 / 3.1415927, 0.53 / r + time * 1.55);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.13, vec3(0.46, 0.56, 0.46), vec3(0.38, 0.41, 0.35), vec3(0.85, 1.02, 1.37), vec3(0.29, 0.55, 0.78));
	col *= clamp(r * 2.57, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
