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
        vec2 im = vec2(sin(t * 0.16 + jf * 4.0), cos(t * 0.18 * jf)) * 0.53;
        xs += sin(length(p - im) * 145.23 - t * 5.67 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.55;
	p = abs(p) - 0.23;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.64 + time * 0.28, vec3(0.50, 0.48, 0.50), vec3(0.44, 0.36, 0.47), vec3(0.95, 1.03, 0.74), vec3(0.30, 0.70, 0.15));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
