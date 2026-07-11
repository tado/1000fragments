uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.64 + jf * 4.0), cos(t * 0.14 * jf)) * 0.66;
        xs += sin(length(p - im) * 166.34 - t * 4.92 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 3.74 / 3.1415927, 0.50 / r - time * 1.49);
	float d = field(tv, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.30, vec3(0.44, 0.54, 0.43), vec3(0.42, 0.32, 0.35), vec3(1.04, 0.84, 1.30), vec3(0.14, 0.44, 0.24));
	col *= clamp(r * 1.84, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
