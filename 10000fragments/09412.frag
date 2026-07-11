uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.29 + jf * 4.0), cos(t * 0.42 * jf)) * 0.37;
        xs += sin(length(p - im) * 178.62 - t * 8.48 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	p = fract(p * 2.09) - 0.5;
	p += vec2(0.77, 0.03) * sin(length(p) * 5.23 - time * 1.48) * 0.13;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.51 + time * 0.01, vec3(0.56, 0.49, 0.44), vec3(0.41, 0.36, 0.33), vec3(0.93, 0.82, 1.30), vec3(0.18, 0.77, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
