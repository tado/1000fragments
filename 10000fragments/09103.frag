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
        vec2 im = vec2(sin(t * 0.70 + jf * 4.0), cos(t * 0.24 * jf)) * 0.34;
        xs += sin(length(p - im) * 122.40 - t * 11.81 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.83;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.67 + time * 0.08, vec3(0.58, 0.41, 0.44), vec3(0.44, 0.47, 0.43), vec3(1.29, 0.98, 0.95), vec3(0.89, 0.95, 0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
