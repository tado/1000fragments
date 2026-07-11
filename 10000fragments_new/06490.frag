uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.51 + jf * 4.0), cos(t * 0.59 * jf)) * 0.74;
        xs += sin(length(p - im) * 196.11 - t * 10.04 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 1.41) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.36 + time * 0.18, vec3(0.53, 0.59, 0.49), vec3(0.47, 0.45, 0.38), vec3(1.27, 1.06, 1.14), vec3(0.86, 0.23, 0.74));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
